import { Background } from "../layouts/Backgrounds";

export default function Index() {
  return (
    <Background
      type="dotted"
      className="flex flex-col h-screen justify-center items-center text-center p-2"
    >
      <span className="font-bold text-5xl text-accent-neon font-doto">
        Nada que mostrar
      </span>
      <span className="font-monocraft text-fg/75">
        Quizá, pronto haya algo nuevo
      </span>
    </Background>
  )
}
