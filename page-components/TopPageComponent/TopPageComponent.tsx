import { TopPageComponentProps } from './TopPageComponentProps';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
	return (
		<>
			{products && (
				products.map(p => (
					<div key={p._id}>
						<div>{p._id}</div>
						<div>{p.title}</div>
						<div>{p.description}</div>
						<hr />
					</div>
				))
			)}
		</>
	);
};