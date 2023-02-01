import cn from 'classnames';
import { ReviewFormProps } from './ReviewFormProps';
import styles from './ReviewForm.module.scss';
import { Input } from '../Input';
import { Rating } from '../Rating';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import IconClose from './close.svg';

export const ReviewForm = ({ className, ...restProps }: ReviewFormProps): JSX.Element => {
	return (
		<>
			<form
				className={cn(styles.form, className)}
				{...restProps}
			>
				<Input className={styles.form__name} placeholder='Имя' />
				<Input className={styles.form__title} placeholder='Заголовок отзыва' />
				<div className={styles.form__rate}>
					<span>Оценка:</span>
					<Rating rating={0} />
				</div>
				<Textarea className={styles.form__text} placeholder='Текст отзыва' />
				<div className={styles.form__sub}>
					<Button appearance='primary' onClick={() => console.log('ass')}>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</form>
			<div className={styles.success}>
				<div className={styles.success__title}>Ваш отзыв отправлен!</div>
				<div className={styles.success__text}>Спасибо, ваш отзыв будет опубликован после проверки</div>
				<button className={styles.success__button} type='button'><IconClose /></button>
			</div>
		</>
		
	);
};