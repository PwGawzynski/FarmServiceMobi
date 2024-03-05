import { Button, Card, H2, Paragraph, XStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';

export function WorkersDesktop() {
  /* const { data } = useQuery({
    queryKey: ['workers'],
    queryFn: () => [],
  }); */
  return (
    <ScreenBase name="Workers">
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <H2 color="$dark11">Sony A7IV</H2>
          <Paragraph>Now available</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$10">Purchase</Button>
        </Card.Footer>
        <Card.Background />
      </Card>
    </ScreenBase>
  );
}
