import { ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Feather from "react-native-vector-icons/Feather";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: ${RFValue(24)}px ${RFValue(20)}px;
`;

export const Content = styled(ScrollView)``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const ActivityIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ActivityIndicatorMessage = styled.Text`
  font-size: ${RFValue(11)}px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text};
`;
