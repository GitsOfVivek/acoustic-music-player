import { useEffect, useRef, useState } from 'react';
import {
	FaBackward,
	FaForward,
	FaPauseCircle,
	FaPlayCircle,
} from 'react-icons/fa';
import './Main.scss';
import { songData } from '../../config';
import Header from '../Header/Header';
import Library from '../Library/Library';

const Main = () => {
	const [audioProgress, setAudioProgress] = useState(60);
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(
		window.localStorage.getItem('current_song')
			? JSON.parse(window.localStorage.getItem('current_song')).songIndex
			: 0
	);
	const [currentMusicDetails, setCurrentMusicDetails] = useState(
		songData[currentSongIndex]
	);
	const [isLoading, setIsLoading] = useState(true);
	const avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
	const [avatarClassIndex, setAvatarClassIndex] = useState(0);
	const currentAudio = useRef(null);
	const [musicTotalLength, setMusicTotalLength] = useState('00 : 00');
	const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');

	// Library
	const [isLibraryVisible, setIsLibraryVisible] = useState(true);

	const handleMusicProgressBar = e => {
		setAudioProgress(e.target.value);
		currentAudio.current.currentTime =
			(e.target.value * currentAudio?.current?.duration) / 100;
	};
	const handleAudioPlay = () => {
		if (currentAudio?.current?.paused) {
			currentAudio?.current?.play();
			setIsAudioPlaying(true);
		} else {
			setIsAudioPlaying(false);
			currentAudio?.current?.pause();
		}
	};
	const handlePrevSong = () => {
		if (currentSongIndex <= 0) {
			setCurrentSongIndex(songData?.length - 1);
		} else {
			setCurrentSongIndex(prev => prev - 1);
		}
	};
	const handleNextSong = () => {
		if (currentSongIndex >= songData?.length - 1) {
			setCurrentSongIndex(0);
		} else {
			setCurrentSongIndex(prev => prev + 1);
		}
	};
	const handleAvatar = () => {
		if (avatarClassIndex >= avatarClass?.length - 1) {
			setAvatarClassIndex(0);
		} else {
			setAvatarClassIndex(avatarClassIndex + 1);
		}
	};
	const onLoadedMetadata = () => {
		handleAudioUpdate();
		setIsLoading(false);
		if (isAudioPlaying) {
			currentAudio?.current?.play();
		}
	};
	const handleAudioUpdate = () => {
		// Input Muisc Total Length
		const minutes = Math.floor(currentAudio?.current?.duration / 60);
		const seconds = Math.floor(currentAudio?.current?.duration % 60);

		let musicTotalLen = `${minutes < 10 ? `0${minutes}` : minutes} : ${
			seconds < 10 ? `0${seconds}` : seconds
		}`;
		if (musicTotalLen == 'NaN : NaN') {
			musicTotalLen = '00 : 00';
		}
		setMusicTotalLength(musicTotalLen);

		// Input Muisc Current Time
		const min = Math.floor(currentAudio?.current?.currentTime / 60);
		const sec = Math.floor(currentAudio?.current?.currentTime % 60);
		const musicCurrTime = `${min < 10 ? `0${min}` : min} : ${
			sec < 10 ? `0${sec}` : sec
		}`;
		setMusicCurrentTime(musicCurrTime);

		const progress = parseInt(
			(currentAudio?.current?.currentTime /
				currentAudio?.current?.duration) *
				100
		);
		setAudioProgress(isNaN(progress) ? 0 : progress);
	};

	useEffect(() => {
		setCurrentMusicDetails(songData[currentSongIndex]);
		currentAudio.current.src = songData[currentSongIndex].audio;
		if (isAudioPlaying) {
			currentAudio?.current?.play();
		} else {
			currentAudio?.current?.pause();
		}
		window.localStorage.setItem(
			'current_song',
			JSON.stringify({
				songIndex: currentSongIndex,
			})
		);
	}, [currentSongIndex]);

	useEffect(() => {
		setTimeout(() => {
			setIsLibraryVisible(false);
		}, 3000);
	}, []);

	return (
		<div
			className="main-wrapper"
			style={{
				background:
					currentMusicDetails?.color?.length > 1
						? `linear-gradient(to bottom right, ${currentMusicDetails?.color[0]}, ${currentMusicDetails?.color[1]}) `
						: 'var(--color-secondary)',
			}}>
			<div className="main">
				<div
					className={`music-player-wrapper ${
						isLibraryVisible && window.innerWidth > 1024
							? 'margin-right-450'
							: isLibraryVisible && window.innerWidth > 768
							? 'margin-right-300'
							: ''
					}`}>
					<Header
						currentMusicDetails={currentMusicDetails}
						setIsLibraryVisible={setIsLibraryVisible}
						isLibraryVisible={isLibraryVisible}
					/>
					<audio
						src=""
						ref={currentAudio}
						onEnded={handleNextSong}
						onTimeUpdate={handleAudioUpdate}
						onLoadStart={() => setIsLoading(true)}
						onLoadedMetadata={onLoadedMetadata}></audio>
					<div className="music-Container">
						<img
							src={currentMusicDetails?.cover}
							className={`${avatarClass[avatarClassIndex]} ${
								isAudioPlaying && !isLoading ? 'animation' : ''
							}`}
							onClick={handleAvatar}
							alt="song Avatar"
							id="songAvatar"
						/>
						<p className="music-Head-Name">
							{currentMusicDetails?.name}
						</p>
						<p className="music-Artist-Name">
							{currentMusicDetails?.artist}
						</p>
						<div className="musicTimerDiv">
							<p className="musicCurrentTime">
								{musicCurrentTime}
							</p>
							<p className="musicTotalLenght">
								{musicTotalLength}
							</p>
						</div>
						<input
							type="range"
							name="musicProgressBar"
							className="musicProgressBar"
							value={audioProgress}
							onChange={handleMusicProgressBar}
							style={{
								background: currentMusicDetails?.color?.[1],
							}}
						/>
						<div className="musicControlers">
							<FaBackward
								className="musicControler"
								onClick={handlePrevSong}
							/>
							{isLoading ? (
								<div className="spinner"></div>
							) : isAudioPlaying ? (
								<FaPauseCircle
									onClick={handleAudioPlay}
									className="playBtn"
								/>
							) : (
								<FaPlayCircle
									onClick={handleAudioPlay}
									className="playBtn"
								/>
							)}

							<FaForward
								className="musicControler"
								onClick={handleNextSong}
							/>
						</div>
					</div>
				</div>
				<Library
					currentSongIndex={currentSongIndex}
					setCurrentSongIndex={setCurrentSongIndex}
					isLibraryVisible={isLibraryVisible}
					setIsLibraryVisible={setIsLibraryVisible}
				/>
			</div>
		</div>
	);
};

export default Main;
