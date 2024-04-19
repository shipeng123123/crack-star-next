import React from "react";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout from "../component/Layout";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import "./index.scss"
export const metadata = {
  title: "破局者星球|AI工具箱｜AI教程|AI集合｜OpenAI｜AI免费教程｜AI工具软件｜副业教程｜素材集合",
  description: "破局者星球|AI工具箱｜AI教程|AI集合｜OpenAI｜AI免费教程｜AI工具软件｜副业教程｜素材集合",
};

const RootLayout = async ({ children })=> {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry><Layout element={children}/></AntdRegistry>
      </body>
    </html>
  );
}
export default RootLayout