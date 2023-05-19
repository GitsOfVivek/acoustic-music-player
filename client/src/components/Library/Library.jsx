import './Library.scss';
import { songData } from '../../config';
import { FaTimes } from 'react-icons/fa';
const Library = ({
	isLibraryVisible,
	setIsLibraryVisible,
	currentSongIndex,
	setCurrentSongIndex,
}) => {
	return (
		<div className={`library ${isLibraryVisible ? 'active-library' : ''}`}>
			<div className="heading">
				<div>Library</div>
				<FaTimes
					onClick={() => {
						setIsLibraryVisible(false);
					}}
					className="close"
				/>
			</div>
			{songData.map((songInfo, idx) => (
				<div
					onClick={() => {
						setCurrentSongIndex(idx);
					}}
					key={songInfo.id}
					className={`songItem ${
						currentSongIndex === idx ? 'active' : ''
					}`}>
					<div className="img">
						{songInfo?.cover ? (
							<img src={songInfo?.cover} alt={songInfo?.name} />
						) : (
							<div className="dummy-img"></div>
						)}
					</div>
					<div className="info">
						<div className="name">{songInfo?.name}</div>
						<div className="artist">{songInfo?.artist}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Library;
