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

const imgURL =
	"https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/176042962_1450678971769407_6363789580747292538_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=mtdukPDOHf8AX9uu-uy&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT_iC0kqlJxaeU4y6yTxNF2a9xapF47L68umUBNkaKbI7g&oe=62F50A09&_nc_sid=7bff83";
const name = "Iva Chatterjee";

const getLinkById = (id: string) => {
	return linksData?.find(({ id: itemId }) => itemId === id)?.href ?? "";
};

const Home: NextPage = () => {
	return (
		<div className="bg-cover bg-center bg-no-repeat bg-fixed bg-[url('/neon.jpeg')] h-full min-h-screen text-[#CEEDFF]">
			<Head>
				<title>Bio Link - {name}</title>
				<meta
					name="description"
					content={`Bio Link - ${name} - My Youtube Channel is Maniva. Please Subscribe that.`}
				/>
				<meta
					name="keywords"
					content={`Maniva, ${name.split("")[0]}, ${name}, Instagram`}
				/>
				<meta name="author" content={name} />
				<meta property="og:image" content={imgURL} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={container}>
				<section className="flex flex-col items-center pt-16">
					<div>
						<Avatar url={imgURL} alt="" />
					</div>
					<h1 className="uppercase tracking-wide">{name}</h1>
					<div className="flex gap-2 mt-2 items-center">
						<Link href={getLinkById("fb")} passHref>
							<a target="_blank">
								<RiFacebookCircleFill
									className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
									size="1.75rem"
								/>
							</a>
						</Link>
						<Link href={getLinkById("yt")} passHref>
							<a target="_blank">
								<RiYoutubeFill
									className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
									size="1.75rem"
								/>
							</a>
						</Link>
						<Link href={getLinkById("ig")} passHref>
							<a target="_blank">
								<RiInstagramFill
									className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
									size="1.75rem"
								/>
							</a>
						</Link>
						<Link href={getLinkById("gm")} passHref>
							<a target="_blank">
								<MdOutgoingMail
									className="cursor-pointer hover:-translate-y-0 hover:scale-125 duration-700 ease-in-out"
									size="1.75rem"
								/>
							</a>
						</Link>
					</div>
				</section>
				<section className="flex flex-col items-center cursor-pointer my-8">
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
					<Link href="https://www.linkedin.com/in/manoj-mukherjee/" passHref>
						<a
							className="text-sky-500 cursor-pointer hover:-translate-y-0 hover:scale-110 duration-700 ease-in-out"
							target="_blank">
							Manoj Mukherjee
						</a>
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default Home;
