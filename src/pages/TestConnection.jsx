export default function TestEnv() {
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  return <div>Check console</div>;
}
