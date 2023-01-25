import { AdvantagesProps } from './AdvantagesProps';
import styles from './Advantages.module.scss';
import { Par } from '../Par';

export const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(advantage => (
				<div key={advantage._id} className={styles.advantage}>
					<div className={styles.advantage__title}>{advantage.title}</div>
					{advantage.description.length ? <Par className={styles.advantage__description}>{advantage.description}</Par> : null}
				</div>
			))}
		</>
	);
};