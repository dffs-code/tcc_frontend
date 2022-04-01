import './style.css';
import { useHelpManager } from '../../hooks/useHelpManager';
import MainHelpSection from '../../components/HelpPage/MainHelpSection';
import favicon  from '../../img/favicon.png';
import AccountHelpSection from '../../components/HelpPage/AccountHelpSection';
import SolicitationHelpSection from '../../components/HelpPage/SolicitationHelpSection';
import ReportHelpSection from '../../components/HelpPage/ReportHelpSection';
import TipsHelpSection from '../../components/HelpPage/TipsHelpSection';
import PayHelpSection from '../../components/HelpPage/PayHelpSection';
import RatingHelpSection from '../../components/HelpPage/RatingHelpSection';

export default function Ajuda(){
    const { help } = useHelpManager();
    function renderSection(what) {
        switch (what) {
            case 0:
                return <MainHelpSection />
            case 1:
                return <AccountHelpSection />
            case 2:
                return <SolicitationHelpSection />
            case 3:
                return <RatingHelpSection />
            case 4:
                return <PayHelpSection />
            case 5:
                return <TipsHelpSection />
            case 6:
                return <ReportHelpSection />
            default:
                break;
        }
    }

    return(
        <div className="help-background content" id="help_page">
            <div className="header-help-container align-items-center d-flex justify-content-center flex-wrap">
                <h4 className="mt-3 text-center">
                    <img src={favicon} alt="Logo ensina-me" /><br /><br />
                    Como podemos te ajudar?
                </h4>
            </div>
            {renderSection(help)}
            <div className="footer-help mt-5 d-flex justify-content-center align-items-center flex-wrap">
                <h3 className="primary-color w-100 text-center">Não encontrou o que precisava?</h3>
                <p className="mb-5 mt-2 text-center">📫 Nos envie um e-mail: <a href="mailto:study.ensiname@gmail.com">study.ensiname@gmail.com</a></p>
            </div>
        </div>
    );
}