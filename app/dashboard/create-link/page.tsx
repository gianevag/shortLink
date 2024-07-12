"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button/button";
import { BackButton } from "../ui/buttons/buttons";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateLinkFormData } from "definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateCreateLinkForm } from "@/zod/createLink";
import { Input } from "@/components/input/input";
import { createUrlFromObject } from "@/lib/createUrlFromObject";
import { createShortLink } from "@/actions/shortLink";
import { ErrorMessage } from "@/components/errorMessage/errorMessage";

export default function CreateLink({
  searchParams,
}: {
  searchParams: {
    originalUrl?: string;
    isActive?: boolean;
    description?: string;
  };
}) {
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const pathname = usePathname();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(validateCreateLinkForm),
    mode: "onChange",
    defaultValues: {
      originalUrl: searchParams.originalUrl || "",
      isActive: searchParams.isActive || false,
      description: searchParams.description,
    },
  });

  // on form submit create a short link
  const onSubmit = async (data: CreateLinkFormData) => {
    const response = await createShortLink(data);

    if (response.message) {
      setServerErrorMessage(response.message);
    } else {
      console.log("push to", "/dashboard");
    }
  };

  // watch for changes in the form and update the url query params
  useEffect(() => {
    const query = createUrlFromObject(watch());
    replace(`${pathname}?${query}`);
  }, [watch(), pathname, createUrlFromObject, replace]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create Short Link
        </h2>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Original URL
              </label>
              <Input
                id="originalUrl"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="add your original URL here..."
                error={errors.originalUrl}
                {...register("originalUrl")}
              />
            </div>
            <div className="w-full">
              <label className="inline-flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  className="sr-only peer"
                  error={errors.isActive}
                  {...register("isActive")}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Active
                </span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a product description here..."
                {...register("description")}
              />
            </div>
          </div>
          {serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
          <div className="flex items-center space-x-4">
            <Button type="submit" className="w-[200px]">
              Create Shorl Link
            </Button>
            <BackButton />
          </div>
        </form>
      </div>
    </section>
  );
}
