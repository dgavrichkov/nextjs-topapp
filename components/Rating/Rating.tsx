import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';
import { RatingProps } from './RatingProps';
import StarIcon from './star.svg';
import styles from './Rating.module.scss';


export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, className, ...restProps }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => handleClick(i + 1)}
				>
					<StarIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
					/>
				</span>
			);
		});
		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const handleClick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code != 'Space' || !setRating) {
			return;
		}
		setRating(i);
	};

	return (
		<div className={styles.ratingWrapper}>
			<div
				ref={ref}
				className={cn(className, {
					[styles.error]: error
				})}
				{...restProps}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
			</div>
			{error ? (<div className={styles.errorMessage}>{error.message}</div>) : null}
		</div>
		
	);
});