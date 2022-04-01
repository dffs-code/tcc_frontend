import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function RatingComponent(props){
    const teacher_profile = props.request.card.teacher.user.avatar;
    const teacher_name = props.request.card.teacher.user.name;
    const start_class = new Date(props.request.startDateTime);
    const end_class = new Date(props.request.endDateTime);
    const subject_class = props.request.card.subject.name;
    const dataOpt = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const monthDay = { month: 'numeric', day: 'numeric' }
    const minHour = { hour: 'numeric', minute: 'numeric'}

    const [star, setStar] = useState(0);
    const [adicionalComment, setAdicionalComment] = useState('');

    function submitRequest() {
        if(!star){
            toast.error('Favor inserir uma nota de 1 a 5 para a aula');
            return
        }
        const payload = {
            card_id: props.request.card.id,
            request_id: props.request.id,
            stars: star,
            message: adicionalComment 
        }

        api.post('/rating', payload)
            .then(res => {
                if(res.status === 201){
                    toast.success('Obrigado pela avaliação!');
                    props.autoClose();
                }
            }).catch(error =>{
                toast.error('Erro interno, tente novamente.');
            });
    }

    return(
        <div className="content" id="rating_modal">
            <div className="header-modal d-flex justify-content-center flex-wrap">
                <div className="section-pic position-relative mb-3 w-100">
                    {teacher_profile 
                        ?   
                            <div className="content-image d-flex justify-content-center"> 
                                    <div style={{backgroundImage: `url(${teacher_profile})`}} />
                            </div>
                        : 
                            <div className="d-flex justify-content-center align-items-center" id="google_alike">
                                <div className="d-flex justify-content-center align-items-center">{ teacher_name ? (teacher_name.charAt(0)).toUpperCase() : ''}</div>
                            </div>
                    } 
                </div>
                <p><b>Como foi sua aula com {teacher_name.split(' ')[0]} em {new Intl.DateTimeFormat('pt-BR', monthDay).format(start_class)} às {new Intl.DateTimeFormat('pt-BR', minHour).format(start_class)}?</b></p>
            </div>
            <div className="about_request">
                <div className="read_only">
                    <p>{new Intl.DateTimeFormat('pt-BR', dataOpt).format(start_class)} - {new Intl.DateTimeFormat('pt-BR', minHour).format(end_class)}</p>
                    <p>{subject_class}</p>
                </div>
                <div className="my-4">
                    <h5><b>O que você achou da aula?</b></h5>
                    <Rating name="rating" className="rating-values" value={star} onChange={(e) => setStar(Number(e.target.value))} />
                </div>
                <h5 className="mt-2"><b>Comentários adicionais:</b></h5>
                <textarea
                    id="about"
                    name="about"
                    rows="5"
                    cols="100"
                    placeholder="Deixe um comentário sobre sua experiência"
                    className="p-2 w-100"
                    value={adicionalComment}
                    onChange={(event) => {
                        setAdicionalComment(event.target.value);
                    }}
                />

                <Button className="submit-rating py-1 px-5 mt-5 mb-2" onClick={submitRequest}>
                    Avaliar Professor
                </Button>
                <p className="w-100 text-center mt-3 cursor-pointer" onClick={props.autoClose}><u>Avaliar depois</u></p>
             
            </div>
        </div>
    );
}