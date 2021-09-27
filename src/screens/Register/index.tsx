import React, { useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
// import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
// import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  // TransactionsTypes
} from "./styles";

interface FormData {
  name: string;
  cpf: string;
  email: string;
  telefone: string;
  cidade: string;
  endereco: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  // const [transactionType, setTransactionType] = useState('');
  // const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // const [category, setCategory] = useState({
  //   key: 'category',
  //   name: 'Categoria'
  // });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: FormData) {
    // if(!transactionType)
    //   return Alert.alert('Selecione o tipo da transação');

    // if(category.key === 'category')
    //   return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      cpf: form.cpf,
      email: form.email,
      telefone: form.telefone,
      cidade: form.cidade,
      endereco: form.endereco,
    };

    try {
      const dataKey = "@z2:user";

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container1}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <Title>Cadastro</Title>
            </Header>

            <Form>
              <Fields>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  error={errors.name && errors.name.message}
                />

                <InputForm
                  name="cpf"
                  control={control}
                  placeholder="CPF"
                  autoCorrect={false}
                  keyboardType="numeric"
                  error={errors.cpf && errors.cpf.message}
                />
                <InputForm
                  name="email"
                  control={control}
                  placeholder="E-mail"
                  autoCorrect={false}
                  keyboardType="email-address"
                  error={errors.email && errors.email.message}
                />

                <InputForm
                  name="telefone"
                  control={control}
                  placeholder="Número Celular"
                  autoCorrect={false}
                  error={errors.telefone && errors.telefone.message}
                />

                <InputForm
                  name="cidade"
                  control={control}
                  placeholder="Cidade"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  error={errors.cidade && errors.cidade.message}
                />
                <InputForm
                  name="endereco"
                  control={control}
                  placeholder="Endereco"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  error={errors.endereco && errors.endereco.message}
                />

                {/* <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>
 */}
                {/* <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            /> */}
              </Fields>

              <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>

            {/* <Modal visible={categoryModalOpen}>
          <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal> */}
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
});
