import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Inputs/Input";
import Sidebar from "../../components/Layout/Sidebar";
import heroImage from "../../assets/hero.png";
import Button from "../../components/Buttons/Button";

const steps = [
	{ number: "1", title: "Procure por uma fase", description: "Encontre uma fase do seu interesse.", content: <div className="h-full w-16 rounded bg-[#f1f1f1]" /> },
	{ number: "2", title: "Analise a fase", description: "Leia atentamente para entender o que cada fase pede.", content: <div className="flex h-full gap-1.5"><div className="w-3 rounded bg-[#789345]" /><div className="w-12 space-y-1"><i className="block h-2 rounded bg-[#dededc]" /><i className="block h-5 rounded bg-[#e8e8e6]" /><i className="block h-3 rounded bg-[#dededc]" /></div><div className="w-12 rounded bg-[#f1f1f1]" /></div> },
	{ number: "3", title: "Comece a resolver!", description: "Comece a resolver o desafio da fase com seu código.", content: <div className="flex h-full gap-1.5"><div className="w-3 rounded bg-[#789345]" /><div className="w-12 space-y-1"><i className="block h-2 rounded bg-[#dededc]" /><i className="block h-5 rounded bg-[#e8e8e6]" /><i className="block h-3 rounded bg-[#dededc]" /></div><div className="w-12 rounded bg-[#f1f1f1]" /></div> },
];

function SectionTitle({ children }) {
	return <h2 className="border-b border-[#b9bbaa] pb-2 text-sm font-bold tracking-wide text-[#697b43]">{children}</h2>;
}

export default function Ajuda() {
	const { logout } = useAuth();

	return (
		<main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
			<div className="flex min-h-[calc(100vh-2rem)] md:rounded-md">
				<Sidebar handleLogout={logout} />
				<section className="min-w-0 flex-1 px-6 py-7 md:px-12 md:py-8 bg-[#f8f8f6] rounded-2xl">
					<header className="mb-8 border-b border-[#b9bbaa] pb-2 text-sm font-bold">Ajuda</header>
					<div className="mx-auto">
						<section className="flex gap-x-20 w-1/2 mx-auto">
							<img src={heroImage} alt="Ilustração decorativa" className="h-64 w-64 object-contain opacity-70" />	
							<div className="flex flex-col justify-center w-lg">
								<h1 className="mb-4 text-2xl font-bold tracking-wide text-[#667d3c]">QUEM SOMOS</h1>
								<p className="max-w-[440px] text-[10px] leading-[1.55] text-[#858a72]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nunc ut diam consequat, vitae ultricies justo dignissim. Pellentesque eget urna commodo, maximus elit quis, aliquet quam.</p>
								<p className="mt-3 max-w-[440px] text-[10px] leading-[1.55] text-[#858a72]">Donec nec tincidunt lorem. Nullam bibendum neque a vestibulum ornare. Donec et eros nunc. Integer quis ex id mi aliquet vestibulum vel sit amet nisi.</p>
							</div>
						</section>
						<section className="mb-10">
							<SectionTitle>Como começar</SectionTitle>
							<div className="mt-6 grid gap-7 md:grid-cols-3 w-2/3 mx-auto">
								{steps.map((step) => (
									<article key={step.number}>
										<div className="mb-3 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#789345] text-sm font-bold text-white">{step.number}</span><div><h3 className="text-[11px] font-bold text-[#718349]">{step.title}</h3><p className="text-[8px] leading-tight text-[#939782]">{step.description}</p></div></div>
										<div className="flex h-24 items-center gap-3 rounded-sm border border-[#e4e4e1] bg-white p-2 shadow-[0_2px_3px_rgba(50,50,40,.22)]">{step.content}{step.number === "1" && <div className="text-[9px] text-[#686d5d]"><b>Fácil</b><br />Nome da fase<br />5 Desafios<br /><button type="button" className="mt-1 rounded-full bg-[#789345] px-3 py-0.5 text-[8px] text-white">Detalhes</button></div>}</div>
									</article>
								))}
							</div>
						</section>
						<section>
							<SectionTitle>Entre em contato</SectionTitle>
							<form className="mt-10 grid gap-5 md:grid-cols-2 w-2/3 mx-auto" onSubmit={(event) => event.preventDefault()}>
								<Input label="Nome" placeholder="Insira o seu nome" />
								<Input label="E-mail" type="email" placeholder="Insira o seu e-mail" />
								<div className="md:col-span-2"><Input as="textarea" label="Mensagem" placeholder="Insira a sua mensagem" rows={3} /></div>

								<div className="col-span-2 flex">
									<Button
										type="submit"
										text="Confirmar"
										className="mx-auto rounded-xl bg-[#789345] px-10 py-2 text-sm font-bold text-white shadow-md cursor-pointer transition hover:bg-[#6f7759]"
									/>
								</div>
							</form>
						</section>
					</div>
				</section>
			</div>
		</main>
	);
}
