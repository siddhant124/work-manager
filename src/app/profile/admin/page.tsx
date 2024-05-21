async function setTimeoutFun() {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  }

export default async function AdminPage() {

    await setTimeoutFun()
    return <h1>This is admin page</h1>;
  }
  