// app/reset/page.jsx
import ResetForm from "./reset-form";

export default async function ResetPage({ searchParams }) {
  const searchparams = await searchParams()
  const token = searchparams.token;
  console.log(token)
  return <ResetForm token={token} />;
}
