import './Header.scss';
import { FaBars } from 'react-icons/fa';

const Header = ({
	currentMusicDetails,
	isLibraryVisible,
	setIsLibraryVisible,
}) => {
	return (
		<div className="header-wrapper">
			<div className="header">
				<div
					className="logo"
					style={{
						color: currentMusicDetails?.color?.[1] || '#353535',
					}}>
					Acostic
				</div>
				<div className="right-sec">
					{/* <div className="search">
						<input type="text" />
						<button>Search</button>
					</div> */}

					{!isLibraryVisible && (
						<FaBars
							onClick={() => {
								setIsLibraryVisible(prev => !prev);
							}}
							className="bars"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
