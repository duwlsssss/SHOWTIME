import * as S from './Modal.styles';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { Button } from '../button/Button';
import { COLORS, TModalProps, TConfirmModalProps } from '@/types/modal';

export function Modal({ onClose, children }: TModalProps) {
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<S.Overlay onClick={handleOverlayClick}>
			<S.ModalContent>
				<S.CloseIcon onClick={onClose} />
				{children}
			</S.ModalContent>
		</S.Overlay>
	);
}

/*
  사용
  type Message = {
  confirm: string;
  leftBtn: string;
  rightBtn: string;
};

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const message: Message = {
    confirm: '급여 정정을 승인하시겠습니까?',
    leftBtn: '네',
    rightBtn: '아니오'
  }

  {
    isConfirmModalOpen &&
    <ConfirmModal
      onClose={closeConfirmModal}
      message={message}
      color={'green'}
      onClickLeftBtn={test}
      onClickRightBtn={test}
    />
  }
*/

export function ConfirmModal({
	onClose,
	message,
	color = 'gray',
	onClickLeftBtn,
	onClickRightBtn,
}: TConfirmModalProps) {
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<S.Overlay onClick={handleOverlayClick}>
			<S.ConfirmModalContent>
				<S.CloseIcon onClick={onClose} />
				<FaRegQuestionCircle
					style={{ color: `var(--color-${COLORS[color]?.dark})` }}
					className="queistionIcon"
				/>
				<p>{message.confirm}</p>
				<S.BtnContainer>
					<Button
						className="firstBtn"
						color={COLORS[color].dark}
						shape="line"
						onClick={onClickLeftBtn}
					>
						{message.leftBtn}
					</Button>
					<Button color={COLORS[color]?.normal} shape="line" onClick={onClickRightBtn}>
						{message.rightBtn}
					</Button>
				</S.BtnContainer>
			</S.ConfirmModalContent>
		</S.Overlay>
	);
}
