import { useState } from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { ReviewFormProps } from './ReviewFormProps';
import styles from './ReviewForm.module.scss';
import { Input } from '../Input';
import { Rating } from '../Rating';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import IconClose from './close.svg';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, className, ...restProps }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const [isSuccessView, setIsSuccessView] = useState(false);
	const [errorText, setErrorText] = useState('');

	const onSubmit = async (formdata: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formdata, productId });
			console.log(data);
			if (data.message) {
				setIsSuccessView(true);
				reset();
			} else {
				setErrorText('Что-то пошло не так');
			}
		} catch(err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className={cn(styles.form, className)}
				{...restProps}
			>
				<Input
					{...register('name', {required: { value: true, message: 'Заполните имя' } })}
					className={styles.form__name}
					placeholder='Имя'
					error={errors.name}
				/>
				<Input 
					{...register('title', { required: { value: true, message: 'Заполните заголовок' }})}
					className={styles.form__title}
					placeholder='Заголовок отзыва'
					error={errors.title}
				/>
				<div className={styles.form__rate}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={
							{required: {value: true, message: 'Поставьте оценку'}}
						}
						render={({field}) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {required: {value: true, message: 'Напишите текст отзыва'}})}
					className={styles.form__text}
					placeholder='Текст отзыва'
					error={errors.description}
				/>
				<div className={styles.form__sub}>
					<Button appearance='primary' onClick={() => null}>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccessView ? (
				<div className={cn(styles.message, styles.success)}>
					<div className={styles.message__title}>Ваш отзыв отправлен!</div>
					<div className={styles.message__text}>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<button className={styles.message__button} type='button' onClick={() => setIsSuccessView(false)}><IconClose /></button>
				</div>
			) : null}
			{errorText ? (
				<div className={cn(styles.message, styles.error)}>
					<div className={styles.message__title}>отзыв не отправлен</div>
					<div className={styles.message__text}>{errorText}<br />Что-то пошло не так, попробуйте обновить страницу</div>
					<button className={styles.message__button} type='button' onClick={() => setErrorText('')}><IconClose /></button>
				</div>
			) : null}
			
		</form>
		
	);
};