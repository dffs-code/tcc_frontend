import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export default function SubjectRating(props) {
    const [materia_id, setMateria_id] = useState(props.materia_id);//Usa o id pra buscar total de avaliações e stars, vai ser necessário substituir na linha 18 e 19 quando tiver o valor. 

        return(
            <>
                <div className="rating-tag">
                    <Box component="fieldset" mb={3} borderColor="transparent" className="d-flex align-items-center ">      
                        <Rating name="rating" value={materia_id} readOnly />
                        <b className="ml-2">Média de {materia_id} estrelas (238 votos)</b>
                    </Box>
                </div>
            </>
        )
    }