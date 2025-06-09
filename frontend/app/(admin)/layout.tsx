import NextTopLoader from "nextjs-toploader";
import {ToastContainer} from "react-toastify";
import {NavBar} from "@/components/shared/NavBar";


export default function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {

	return (
		<>
			<NextTopLoader color="white"/>
			<NavBar />
			{children}
			<ToastContainer
				position={'bottom-center'}
				autoClose={2000}
				closeOnClick
			/>
		</>
	)
}