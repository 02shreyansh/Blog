import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { imageid } from "../../store/AuthSlice"; //uselater 

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch(); //uselater
    const userData = useSelector((state) => state.auth.userData);
    const [featureImage, setFeatureImage] = useState(post?.featureImage || null);

    const submit = async (data) => {
        try {
            if (post) {
                let updatedFeatureImage = featureImage;
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        updatedFeatureImage = file.$id;
                        if (post.featureImage) {
                            await appwriteService.deleteFile(post.featureImage);
                        }
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featureImage: updatedFeatureImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                let newFeatureImage = null;
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        newFeatureImage = file.$id;
                    }
                }

                const dbPost = await appwriteService.createPost({ 
                    ...data,
                    userId: userData.$id,
                    featureImage: newFeatureImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error in submit:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="lg:w-1/3 lg:px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className=" ms-5 lg:ms-5 md:ms-32 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none file:bg-blue-800 disabled:pointer-events-none disabled:opacity-60"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {featureImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(featureImage)}
                            alt="Featured"
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 ms-5 lg:ms-5 md:ms-32"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full ms-5 lg:ms-5 md:ms-32">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}