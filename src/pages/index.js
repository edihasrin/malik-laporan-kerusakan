import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	MdAccessTime,
	MdFireTruck,
	MdOutlineFileDownload,
	MdOutlineTextSnippet,
	MdOutlineWhatsapp,
	MdPictureAsPdf,
} from "react-icons/md";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

const inter = Inter({ subsets: ["latin"] });

const Card = ({ dataLaporan }) => {
	return (
		<div className="flex w-full gap-x-4 bg-slate-800 font-medium justify-between">
			<div className="bg-red-300 w-24 h-24 ">
				{/* <Image src='/images/img.jpg' width={96} alt='Gambar Mobil'/> */}
			</div>

			<div className="flex flex-col flex-grow py-1 space-y-1">
				<div className="flex">
					<span className="mr-3 pt-1">
						<MdAccessTime />
					</span>
					<span>{dataLaporan.waktu}</span>
				</div>
				<div className="flex ">
					<span className="mr-3 pt-1">
						<MdFireTruck />
					</span>
					<span>{dataLaporan.kode_mobil}</span>
				</div>
				<div className="flex font-thin text-sm">
					<div className="mr-3 pt-1 ">
						<MdOutlineTextSnippet />
					</div>
					<div className="pb-1 w-44 ">{dataLaporan.keterangan}</div>
				</div>
			</div>
		</div>
	);
};

export default function Home() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		setDataLaporan([
			{
				waktu: "Pukul " + data.waktu,
				kode_mobil: "DL " + data.kode_mobil,
				keterangan: data.keterangan,
				// gambar: data.gambar
			},
			...dataLaporan,
		]);
		console.log(data);
	};

	const [files, setFiles] = useState([]);

	const [dataLaporan, setDataLaporan] = useState([]);

	return (
		<div className=" flex flex-col justify-center items-center container mx-auto  text-slate-200">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col mt-5 justify-center items-center text-slate-600 gap-y-5 w-80 ">
					<div className="bg-slate-800 h-40 w-full">
						<FilePond
							allowMultiple={true}
							maxFiles={3}
							server="./images"
						/>
					</div>
					<div className="flex gap-x-5 w-full font-bold text-xl ">
						<input
							{...register("waktu", { required: true })}
							required
							type="time"
							className="outline-none p-4 w-32 text-center"
						/>
						<div className="flex flex-1">
							<span className="bg-slate-300 p-4 ">DL</span>
							<input
								{...register("kode_mobil", { required: true })}
								required
								type="number"
								minLength={3}
								maxLength={3}
								placeholder="ID Mobil"
								className="outline-none p-4 w-full text-center"
							/>
						</div>
					</div>
					<textarea
						{...register("keterangan", { required: true })}
						required
						rows="3"
						className="w-full p-3 outline-none"
						placeholder="Keterangan"
					></textarea>
					<div className="flex text-slate-300 gap-x-8">
						<button className="bg-slate-800 p-4 w-24 rounded-sm shadow-md">
							Reset
						</button>
						<button
							type="submit"
							className="bg-violet-700 p-4 w-24 font-bold rounded-sm shadow-md"
						>
							Simpan
						</button>
					</div>
				</div>
			</form>

			{dataLaporan.length > 0 && (
				<div className="w-80 flex mt-10 flex-col gap-y-4">
					<h1 className="uppercase text-base font-semibold text-center">
						Laporan Kerusakan
					</h1>
					<div className="flex items-center justify-center">
						<div className="flex gap-x-3">
							<button className="px-2 py-1 w-16 bg-red-500 flex items-center  justify-center">
								<MdPictureAsPdf />
								<span className="ml-1">PDF</span>
							</button>
							<button className="px-2 py-1 w-16 bg-slate-500 flex items-center  justify-center">
								<MdOutlineTextSnippet />
								<span className="ml-1">TXT</span>
							</button>
							<button className="px-2 py-1 w-16 bg-green-600 flex items-center  justify-center">
								<MdOutlineWhatsapp />
								<span className="ml-1">WA</span>
							</button>
						</div>
					</div>

					{dataLaporan?.map((item, i) => (
						<Card key={i} dataLaporan={item} />
					))}
				</div>
			)}
		</div>
	);
}
