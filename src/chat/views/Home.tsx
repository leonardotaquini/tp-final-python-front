import Title from "@/components/ui/Title";
import { InputForm } from "../components/InputForm";

export const Home = () => {
  return (
    <main className="bg-neutral-800 h-screen grid place-items-center">
      <section className="w-full text-center flex flex-col justify-center items-center">
        <Title />
        <InputForm />
      </section>
    </main>
  );
};
