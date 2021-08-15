import { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";


import "../styles/auth.scss";
import Button from "../components/Button";
import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export default function NewRoom() {

    const history = useHistory()

    const { user } = useAuth()

    const [newRoom, setNewRoom] = useState("");


    //criando nova sala
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        //removendo espacos laterais
        if(newRoom.trim() === ''){
            return
        }

        //banco de dados
        const roomRef = database.ref('rooms')   //referencia chamada rooms
        
        const firebaseRoom = await roomRef.push({   //adicionando info a rooms (nova sala)
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)   //key = id do firebase para a nova sala
    }

    return (
        <div id="page-auth">
            <aside>
                <img
                    src={illustrationImg}
                    alt="Illustration asks and answers"
                />
                <strong>Crie sala de Q&amp;A ao vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={(e) => setNewRoom(e.target.value)}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?{" "}
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
