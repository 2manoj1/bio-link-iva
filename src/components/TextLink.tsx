import Link, { LinkProps } from "next/link";

interface ITextLink extends Pick<LinkProps, "href"> {
	title: string;
}

const TextLink = ({ href, title }: ITextLink) => {
	return (
		<Link
			href={href}
			target="_blank"
			className="my-4 p-4 flex justify-center cursor-pointer items-center shadow-link-s backdrop-blur-3xl w-full min-h-12 opacity-80 rounded-[30px]  md:hover:-translate-y-0 md:hover:scale-110 duration-700 ease-in-out">
			<span className="uppercase tracking-wide" aria-label={title}>
				{title}
			</span>
		</Link>
	);
};

export default TextLink;
