'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { MessageType } from '../../MyChat';
import styles from './ChatInput.module.scss';
import Send from '@/assets/images/send.svg';
import { chatType, fetcMedicalAI, NoPatientQuestion } from '@/apis/Patient';
import { useAppSelector } from '@/redux/store/hooks/store';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@/components/Alarm/SSEHandler';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
};
export default function ChatInput({ messagelist, setMessagelist }: Props) {
  const { accessToken } = useAppSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const decode: Token = jwtDecode(accessToken);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSend = async () => {
    const temp: chatType[] = messagelist.map((message) => ({
      message: message.comment,
      isQuestion: message.question,
    }));

    const q: NoPatientQuestion = {
      isQuestion: true,
      member_id: decode.id,
      PID: decode.id,
      comment: comment,
      agent: 'MG',
      chat_list: temp,
      summary: '',
    };
    //호출
    const ms: MessageType = {
      id: '',
      agent: '',
      comment: comment,
      question: true,
      createDate: new Date().toString(),
      reportId: '',
      memberId: decode.id,
    };
    setMessagelist((prev) => [ms, ...prev]);
    setComment('');
    const response = await fetcMedicalAI(q);
    const res: MessageType = {
      id: '',
      agent: '',
      comment: response.response,
      question: false,
      createDate: new Date().toString(),
      reportId: '',
      memberId: '',
    };
    setMessagelist((prev) => [res, ...prev]);
  };
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.chatInput}
        placeholder="Enter a message"
        value={comment}
        onChange={handleOnChange}
      />
      <Send
        className={styles.sendIcon}
        onClick={() => handleSend()}
      />
    </div>
  );
}
