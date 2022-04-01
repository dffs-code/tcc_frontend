import React from 'react';
import { Skeleton } from '@material-ui/lab';

export default function LoadingCard() {

    return(
        <>
            <div id="card_teacher" className="card-teacher p-3">
                <div className="header-card d-flex justify-content-between align-items-center">
                    <div className="card_price justify-content-left w-25">
                        <div className="text-left">
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width={80}
                                height={30}
                                className="mr-4"
                            />
                        </div>
                    </div>
                    <div className="subject_title w-25">
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width={80}
                            height={30}
                            className="mr-4"
                        />
                    </div>
                    <div className="card_rating justify-content-right w-25">
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width={80}
                            height={30}
                        />
                    </div>
                </div>
                <div className="body-card mt-2 justify-content-center flex-wrap">
                    <Skeleton
                        animation="wave"
                        variant="circle"
                        width={90}
                        height={90}
                        className="mt-4 mb-3 move_skeleton_center"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width={150}
                        height={30}
                        className="mb-3 move_skeleton_center"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width={310}
                        height={150}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width={150}
                        height={40}
                        className="mt-5 text-center move_skeleton_center"
                    />
                </div>
            </div>
        </>
    )
    
}

