import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Date,
} from "./styles";

export interface TravelCardProps {
  id: string;
  name: string;
  source: string;
  destiny: string;
  amount: string; 
  date?: string;
}

interface Props {
  data: TravelCardProps;
}

export function TransactionCard({ data }: Props) {
  // const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={"positive"}>{data.amount}</Amount>

      <Footer>
        <Title>Origem: {data.source}</Title>
        <Title>Destino: {data.destiny}</Title>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
