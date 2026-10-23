import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Inputs/Input";
import PasswordInput from "../../components/Inputs/PasswordInput";
import Button from "../../components/Buttons/Button";
import Sidebar from "../../components/Layout/Sidebar";
import ellipseImage from "../../assets/Ellipse 1.png";
import avatarIcon from "../../assets/Vector 1.png";
import { update, updatePassword } from "../../services/User/UserService";
import { toast } from "sonner";

const labelClassName = "text-xs font-bold tracking-wide text-[#6f7759]";

function SectionTitle({ children }) {
	return <h2 className="border-b border-[#b9bbaa] pb-2 text-sm font-bold tracking-wide text-[#697b43]">{children}</h2>;
}

function ProfileImage() {
	return (
		<div className="relative h-[86px] w-[86px] shrink-0">
			<img
				src={ellipseImage}
				alt=""
				className="h-full w-full object-contain"
			/>

			<img
				src={avatarIcon}
				alt="Imagem de perfil do usuário"
				className="absolute left-1/2 top-1/2 h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 object-contain"
			/>
		</div>
	);
}

export default function Perfil() {
	const { user, logout } = useAuth();

	const [formData, setFormData] = useState({
		login: user.login,
		nome: user.nome,
		email: user.email,
		ativo: 1
	});

	const [passwordData, setPasswordData] = useState({
		senhaAntiga: "",
		novaSenha: "",
		confirmacaoSenha: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handlePasswordChange = (e) => {
		setPasswordData({
			...passwordData,
			[e.target.name]: e.target.value,
		})
	}

  	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			const response = await update(formData, user.uuid);

			if(response){
				toast.success("Dados atualizados com sucesso");
			}else{
				toast.error("Erro ao atualizar dados." || res.error);
			}
		}catch(error){
			console.log("Erro ao atualizar dados: ", error);
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		try{
			const response = await updatePassword(passwordData, user.uuid);

			if(response){
				toast.success("Senha atualizada com sucesso");
			}else{
				toast.error("Erro ao atualizar senha." || res.error);
			}
		}catch(error){
			console.log("Erro ao atualizar senha: ", error);
		}
	};

	const confirmButton = (
		<Button
			type="submit"
			text="Confirmar"
			className="rounded-full bg-[#F2635D] px-8 py-2 text-sm font-bold text-white shadow-md cursor-pointer transition hover:bg-[#e55a50]"
		/>
	);
	console.log(formData);
	console.log(passwordData);
	return (
		<main className="min-h-screen bg-[url('/background.png')] p-0 font-intel-one-mono text-[#6f7759] md:p-2">
			<div className="flex min-h-[calc(100vh-2rem)] md:rounded-md">
				<Sidebar handleLogout={logout} />
				<section className="min-w-0 flex-1 px-6 py-7 md:px-12 md:py-8 bg-[#f8f8f6] rounded-2xl">
					<header className="mb-8 border-b border-[#b9bbaa] pb-2 text-sm font-bold">Meu Perfil</header>

					<div className="flex items-center gap-6 pb-10">
						<ProfileImage />

						<div className="flex flex-col items-start gap-2">
							<span className="text-xs font-bold tracking-wide text-[#697b43]">Imagem de Perfil</span>
							<Button
								text="Editar"
								className="rounded-lg bg-[#F2635D] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md cursor-pointer transition hover:bg-[#e55a50]"
							/>
						</div>
					</div>

					<SectionTitle>Meus Dados</SectionTitle>

					<div className="mx-auto w-full max-w-[720px]">
						<form onSubmit={handleSubmit} className="mt-20 grid gap-x-8 gap-y-6 md:grid-cols-2">
							<Input
								label="Nome"
								type="text"
								name="nome"
								value={formData.nome}
								onChange={handleChange}
								placeholder="Insira o seu nome"
							/>

							<Input
								label="Nome de usuário"
								type="text"
								name="login"
								value={formData.login}
								onChange={handleChange}
								placeholder="Insira o seu nome"
							/>

							<div className="col-span-2">
								<Input
									label="E-mail"
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Insira o seu e-mail"
								/>
							</div>

							<div className="col-span-2 flex justify-center pt-2">{confirmButton}</div>
						</form>

						<form onSubmit={handlePasswordSubmit} className="mt-14 grid gap-x-8 gap-y-6 md:grid-cols-2">
							<PasswordInput
								label="Senha antiga"
								name="senhaAntiga"
								value={passwordData.senhaAntiga}
								onChange={handlePasswordChange}
								placeholder="Insira a sua senha antiga"
								labelClassName={labelClassName}
							/>

							<PasswordInput
								label="Nova Senha"
								name="novaSenha"
								value={passwordData.novaSenha}
								onChange={handlePasswordChange}
								placeholder="Insira a nova senha"
								labelClassName={labelClassName}
							/>

							<PasswordInput
								label="Confirmar Senha"
								name="confirmacaoSenha"
								value={passwordData.confirmacaoSenha}
								onChange={handlePasswordChange}
								placeholder="Confirme a nova senha"
								labelClassName={labelClassName}
							/>

							<div className="col-span-2 flex justify-center pt-2">{confirmButton}</div>
						</form>
					</div>
				</section>
			</div>
		</main>
	);
}
