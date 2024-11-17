import MyChat from './MyChat';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  console.log(params.id);
  return <MyChat />;
}
