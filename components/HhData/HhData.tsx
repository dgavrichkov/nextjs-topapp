import { HhDataProps } from './HhDataProps';
import styles from './HhData.module.scss';
import { Card } from '../Card';
import RateIcon from './star.svg';
import { toPriceRu } from '../../helpers/helpers';


export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.count__title}>Всего вакансий</div>
				<div className={styles.count__value}>{count || 0}</div>
			</Card>
			<Card className={styles.salary}>
				<div className={styles.salary__card}>
					<div className={styles.salary__title}>Начальный</div>
					<div className={styles.salary__value}>{toPriceRu(juniorSalary)}</div>
					<div className={styles.salary__rate}>
						<RateIcon className={styles.starFilled}/>
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div className={styles.salary__card}>
					<div className={styles.salary__title}>Средний</div>
					<div className={styles.salary__value}>{toPriceRu(middleSalary)}</div>
					<div className={styles.salary__rate}>
						<RateIcon className={styles.starFilled} />
						<RateIcon className={styles.starFilled} />
						<RateIcon />
					</div>
				</div>
				<div className={styles.salary__card}>
					<div className={styles.salary__title}>Профессионал</div>
					<div className={styles.salary__value}>{toPriceRu(seniorSalary)}</div>
					<div className={styles.salary__rate}>
						<RateIcon className={styles.starFilled} />
						<RateIcon className={styles.starFilled} />
						<RateIcon className={styles.starFilled} />
					</div>
				</div>
			</Card>
		</div>
	);
};