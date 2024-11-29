import '../style/test.css';

export default function test() {
    return (
        <div id='test'>
            <nav>
                <img src="/or_tracker.png" alt="" />
                <ul>
                    <li><button>Home</button></li>
                    <li><button>Search</button></li>
                    <li><button>Support</button></li>
                    <li><button className='join'>Join</button></li>
                </ul>
            </nav>
            <main>
                <section></section>
                <section></section>
                <section></section>
            </main>
            <footer>
                <div className="top">
                    <div className='left'>
                        <img src="/or_tracker.png" alt="" />
                        <p>OR Tracker</p>
                    </div>
                    <ul>
                        <li><button>Discord</button></li>
                    </ul>
                </div>
                <div className="bottom">
                    <p>@ 2024 Abstra208</p>
                    <ul>
                        <li><button>Terms of Services</button></li>
                        <li><button>Privacy and Policy</button></li>
                        <li><button>Support</button></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}