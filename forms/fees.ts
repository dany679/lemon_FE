import { maskOnlyNumbers } from "@/utils/mask/values";
import * as z from "zod";
const obrigatoryValue = (values: string) => {
  return maskOnlyNumbers(values) && maskOnlyNumbers(values).length > 2 && Number(maskOnlyNumbers(values)) > 1;
};

export const formSearchFeesSchema = z.object({
  months: z.string(),
  date: z.any(),
  nClient: z.string().optional(),
});
export const formSchemaFees = z.object({
  id: z.string().optional(),
  nClient: z.string().min(4, {
    message: " Numero do cliente obrigatorio",
  }),
  referenceDate: z.any().refine(
    (values) => {
      return values;
    },
    {
      message: "Data obrigatoria",
      // path: ["date"],
    }
  ),
  energiaEletricaKwh: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica obrigatorio",
    path: ["energiaEletricaKwh"],
  }),
  // message: " Valor  da energia eletrica obrigatorio",
  energiaEletricaPrice: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica obrigatorio",
    path: ["energiaEletricaPrice"],
  }),
  energiaInjetadaKwh: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica kwh obrigatorio",
    path: ["energiaInjetadaKwh"],
  }),
  energiaInjetadaPrice: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica preço obrigatorio",
    path: ["energiaInjetadaPrice"],
  }),
  energiaCompensadaKwh: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica khw obrigatorio",
    path: ["energiaCompensadaKwh"],
  }),
  energiaCompensadaPrice: z.string().refine((values) => obrigatoryValue(values), {
    message: "energia eletrica preço obrigatorio",
    path: ["energiaCompensadaPrice"],
  }),
  contribPublic: z.string().refine((values) => obrigatoryValue(values), {
    message: "Contribuição publica obrigatorio",
    path: ["ContribPublic"],
  }),
  total: z.string().min(1, {
    message: " Numero do cliente obrigatorio",
  }),
});

export const fakePDFTEXT =
  "Valores Faturados  Itens da Fatura   Unid.   Quant.   Preço Unit   Valor   (R$)   PIS/COFINS   Base Calc.   Aliq.   ICMS   Tarifa Unit. ICMS   ICMS  Energia Elétrica   kWh   100   0,83394409   83,38   0,65313000 Energia injetada HFP   kWh   1.671   0,65313000   -1.091,38   0,65313000 En comp. s/ ICMS   kWh   1.671   0,68383415   1.142,68   0,65313000 Contrib Ilum Publica Municipal   35,92  TOTAL   170,60  Histórico de Consumo  MÊS/ANO   Cons. kWh   Média kWh/Dia   Dias  MAR/23   1.771   53,66   33  FEV/23   1.343   47,96   28  JAN/23   1.054   35,13   30  DEZ/22   1.109   33,60   33  NOV/22   1.206   29,41   41  OUT/22   0   0,00   0  SET/22   0   0,00   0  AGO/22   0   0,00   0  JUL/22   0   0,00   0  JUN/22   0   0,00   0  MAI/22   0   0,00   0  ABR/22   0   0,00   0  MAR/22   0   0,00   0  Reservado ao Fisco  SEM VALOR FISCAL  Base de cálculo (R$)   Alíquota (%)   Valor (R$)  Fale com CEMIG: 116 - CEMIG Torpedo 29810 - Ouvidoria CEMIG: 0800 728 3838 -   Agência Nacional de Energia Elétrica - ANEEL - Telefone: 167 - Ligação gratuita de telefones fixos e móveis.  Código de Débito Automático   Instalação   Vencimento   Total a pagar  008118741548   3004298116   06/04/2023   R$170,60 Março/2023   83670000001-8 70600138002-3 91352800333-2 08118741548-4  NnNnWwNwNnWnNnNnWnWnNwNwNnNnWwWwNnNnNnWwWwNnNnNnWwWwNnWnNnNnNwWwNnNwWwWnNnNnNnWwWwNnWwNwNnNnWnWnNnNwWwNnNnNwWnWnNwNwWnNnWnNwWwWnNwNnNnNwWnNnNwWnNnNnWwWwNnWwWwNnNnNnWnWnNwNwNnWwNnNnWnNwWwNnNnNwWnNnNnNwWnWwWwNnNwNnWnNwNnWnNwWnWnN  BRONYER TOZATTI FERREIRA  RUA JOAO DE ASSIS MARTINS 71 IN CENTRO SUL 35182-036 TIMOTEO, MG CPF 097.7**.***-**  Nº DO CLIENTE   Nº DA INSTALAÇÃO  7202788969   3004298116  Referente a   Vencimento   Valor a pagar (R$)  MAR/2023   06/04/2023   170,60  NOTA FISCAL Nº 0179Energia Elétrica16811 - SÉRIE 000 Data de emissão: 24/03/2023 Consulte pela chave de acesso em: http://www.sped.fazenda.mg.gov.br/spedmg/nf3e chave de acesso: 31230306981180000116660000179168111022735033 Protocolo de autorização: 1312300021710614 24.03.2023 às 23:50:50  Classe   Subclasse   Modalidade Tarifária   Datas de Leitura  Comercial   Outros serviços   Convencional B3   Anterior   Atual   Nº de dias Próxima Trifásico   e outras atividades   09/02   14/03   33   13/04  Informações Técnicas  Tipo de Medição   Medição   Leitura   Leitura   Constante   Consumo kWh Anterior   Atual   de Multiplicação  Energia kWh   AHB988002788   28.029   29.800   1   1.771  DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICA   SEGUNDA VIA  CEMIG DISTRIBUIÇÃO S.A. CNPJ 06.981.180/0001-16 / INSC. ESTADUAL 062.322136.0087. AV. BARBACENA, 1200 - 17° ANDAR - ALA 1 - BAIRRO SANTO AGOSTINHO CEP: 30190-131 - BELO HORIZONTE - MG.   TARIFA SOCIAL DE ENERGIA ELÉTRICA - TSEE FOI CRIADA PELA LEI Nº 10.438, DE 26 DE ABRIL DE 2002  Informações Gerais  RECIBO DE QUITAÇÃO DE DÉBITOS Nº 01/2023 A Cemig, em atendimento à Lei nº 12.007, de 29/07/09, declara quitados os débitos do cliente em referência (contrato 5020826048), relativos ao fornecimento de energia elétrica a esta unidade consumidora, referente aos vencimentos de 01/01/2022 a 31/12/2022, excetuando eventuais débitos que sejam posteriormente apurados diante de possível verificação de irregularidades ou de revisão de faturamento, que abranjam o período em questão. SALDO ATUAL DE GERAÇÃO: 1.954,04 kWh. Tarifa vigente conforme Res Aneel nº 3.046, de 21/06/2022. Redução aliquota ICMS conforme Lei Complementar 194/22. Unidade faz parte de sistema de compensação de energia. Leitura realizada conforme calendário de faturamento. FEV/23 Band. Verde - MAR/23 Band. Verde.";
