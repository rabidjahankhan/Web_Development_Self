import noProjectImage from "../assets/no-projects.png";

export default function Header() {
    return (
        <header className="header">
            <img 
            src={noProjectImage}
            alt="Note Pad Logo"
            />
        </header>
    );
}