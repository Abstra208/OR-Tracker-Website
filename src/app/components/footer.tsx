import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="navigation">
                <div id="left">
                    <div className="group">
                        <img src="/ortracker_logo.png" alt="" />
                        <p>OR Tracker is a bot designed specifically for the community of the OR server, facilitating the seamless tracking of current records.</p>
                    </div>
                </div>
                <div id="right">
                    <div className="group">
                        <ul className="left">
                            <li><h3>Navigation</h3></li>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/records">Records</Link></li>
                            <li><Link href="/users">Users</Link></li>
                        </ul>
                        <ul className="center">
                            <li><h3>Other</h3></li>
                            <li><a href="/invite" target="_blank">Invite bot</a></li>
                            <li><a href="/server" target="_blank">Support server</a></li>
                        </ul>
                        <ul className="right">
                            <li><h3>Legal</h3></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>                        
                    </div>
                </div>
            </div>
            <p>© 2024 - 2025 OR Records • Not affiliated with Discord Inc., Piston Solutions, or Mojang AB.</p>
        </footer>
    );
}