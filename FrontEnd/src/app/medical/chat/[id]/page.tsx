import Chat from './Diagnosis/Chat';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  console.log(params.id);
  return <Chat pid={params.id} />;
}
