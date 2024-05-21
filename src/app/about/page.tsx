import { resolve } from "path";

async function setTimeoutFun() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

export default async function AboutPage() {
  await setTimeoutFun();
  throw new Error("this is manual error thrown to check error.tsx is working fine or not")
  return <h1>This is about page</h1>;
}
