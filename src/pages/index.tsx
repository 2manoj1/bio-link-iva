import type { NextPage } from "next";
import Head from "next/head";
import Avatar from "../components/Avatar";
import {
	RiFacebookCircleFill,
	RiYoutubeFill,
	RiInstagramFill,
} from "react-icons/ri";
import { MdOutgoingMail } from "react-icons/md";
import { SiCodersrank } from "react-icons/si";
import TextLink from "../components/TextLink";
import Link from "next/link";
import linksData from "../data/linksiva.json";

const container = "md:container md:mx-auto lg:max-w-4xl px-4";

const imgURL = "/fv.jpeg";
const name = "Iva Chatterjee";

const getLinkById = (id: string) => {
	return linksData?.find(({ id: itemId }) => itemId === id)?.href ?? "";
};

const titleText = `Bio Link - ${name}`;

const Home: NextPage = () => {
	return (
		<div className="bg-cover bg-center bg-no-repeat bg-fixed bg-[url('/neon.jpeg')] h-full min-h-screen text-[#CEEDFF] flex flex-col">
			<Head>
				<title>{titleText}</title>
				<meta
					name="description"
					content={`${titleText} - My Youtube Channel is Maniva. Please Subscribe that.`}
				/>
				<meta
					name="keywords"
					content={`Maniva, ${name.split("")[0]}, ${name}, Instagram`}
				/>
				<meta name="author" content={name} />
				<meta property="og:title" content="Visit my Bio Link - Maniva" />
				<meta
					property="og:description"
					content={`${titleText} - My Youtube Channel is Maniva. Please Subscribe that.`}
				/>
				<meta
					property="og:image"
					content={`https://www.maniva.co.in${imgURL}`}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={`${container} flex-1`}>
				<section className="flex flex-col items-center pt-2 md:pt-4">
					<div>
						<Avatar url={imgURL} alt="" />
					</div>
					<h1 className="uppercase tracking-wide">{name}</h1>
					<div className="flex gap-2 mt-2 items-center">
						<Link
							href={getLinkById("fb")}
							target="_blank"
							aria-label="Facebook">
							<RiFacebookCircleFill
								className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
								size="1.75rem"
							/>
						</Link>
						<Link href={getLinkById("yt")} target="_blank" aria-label="Youtube">
							<RiYoutubeFill
								className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
								size="1.75rem"
							/>
						</Link>
						<Link
							href={getLinkById("ig")}
							target="_blank"
							aria-label="Instagram">
							<RiInstagramFill
								className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
								size="1.75rem"
							/>
						</Link>
						<Link href={getLinkById("gm")} target="_blank" aria-label="Gmail">
							<MdOutgoingMail
								className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
								size="1.75rem"
							/>
						</Link>
					</div>
				</section>
				<section className="flex flex-col items-center my-2 md:my-3">
					{linksData?.map(({ id, ...rest }) => (
						<TextLink key={id} {...rest} />
					))}
				</section>
			</main>
			<footer>
				<div className="p-4 bg-slate-900 flex justify-center items-center gap-2">
					<span className="flex items-center gap-2">
						Made By <SiCodersrank className=" align-baseline" color="red" />
					</span>
					<Link
						href="https://www.linkedin.com/in/manoj-mukherjee/"
						target="_blank"
						className="text-sky-500 cursor-pointer hover:-translate-y-0 hover:scale-110 duration-700 ease-in-out">
						Manoj Mukherjee
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default Home;
