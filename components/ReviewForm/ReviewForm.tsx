import React from "react";
import axios from "axios";
import cn from "classnames";
import { useForm, Controller } from "react-hook-form";

import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";

import { API } from "../../helpers";

import { Rating, Input, Textarea, Button } from "../index";

import CloseIcon from "./close.svg";

import styles from "./ReviewForm.module.css";

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так");
      }
    } catch (e) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", { required: { value: true, message: "Заполните имя" } })}
          error={errors.name}
          placeholder="Имя"
        />
        <Input
          className={styles.title}
          {...register("title", { required: { value: true, message: "Заполните заголовок" } })}
          error={errors.title}
          placeholder="Заголовок отзыва"
        />

        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Rating rating={field.value} ref={field.ref} setRating={field.onChange} error={errors.rating} isEditable />
            )}
          />
        </div>

        <Textarea
          className={styles.description}
          {...register("description", { required: { value: true, message: "Заполните описание" } })}
          error={errors.description}
          placeholder="Текст отзыва"
        />

        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>

      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
        </div>
      )}

      {error && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon className={styles.close} onClick={() => setError(undefined)} />
        </div>
      )}
    </form>
  );
};
