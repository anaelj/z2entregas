import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TravelCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TravelCardProps {
  id: string;
}
export function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<DataListProps[]>([
    {
      id: "1",
      name: "João da Silva",
      source: "cyro bueno, 614",
      destiny: "imbuia, 228",
      amount: "R$ 14.90",
    },
    {
      id: "2",
      name: "Zeca urubu",
      source: "cyro bueno, 614",
      destiny: "imbuia, 228",
      amount: "R$ 25.00",
    },
  ]);

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@z2:travels";
    const response = await AsyncStorage.getItem(dataKey);

    //   const amount = Number(item.amount)
    //   .toLocaleString('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL'
    //   });

    //   const date = Intl.DateTimeFormat('pt-BR', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: '2-digit'
    //   }).format(new Date(item.date));

    setIsLoading(false);
  }

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/49030804?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Rodrigo</UserName>
                </User>
              </UserInfo>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="total"
              title="Saldo"
              amount={"R$ 39.90"}
              lastTransaction={"01/01/2021"}
            />
          </HighlightCards>

          <Transactions>
            <Title>Entregas</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              // renderItem={( {item} ) => <ListItem title={item.id} checkmark={item.source} />}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
