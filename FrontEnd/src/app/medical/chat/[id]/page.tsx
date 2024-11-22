import Chat from './ChatLayout';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  return <Chat pid={params.id} />;
}
