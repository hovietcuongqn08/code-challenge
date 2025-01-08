import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TokenCurrencySelect, {
  TokenCurrencyOption,
} from "./TokenCurrencySelect";

const validationSchema = Yup.object().shape({
  fromAmount: Yup.number()
    .min(0, "Amount must be positive")
    .required("Required"),
  toAmount: Yup.number().min(0, "Amount must be positive").required("Required"),
  fromCurrency: Yup.string().required("Required"),
  toCurrency: Yup.string().required("Required"),
});

const initialValues = {
  fromAmount: "",
  toAmount: "",
  fromCurrency: "",
  toCurrency: "",
};

const token_base_image_url =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

const SwapForm: React.FC = () => {
  const [tokenCurrencies, setTokenCurrencies] = useState<TokenCurrencyOption[]>(
    []
  );

  const calculateCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const fromToken = tokenCurrencies.find(
      (token) => token.currency === fromCurrency
    );
    const toToken = tokenCurrencies.find(
      (token) => token.currency === toCurrency
    );

    if (fromToken && toToken && amount) {
      return (amount * (fromToken.price / toToken.price)).toFixed(4);
    }

    return 0;
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Submitted:", values);
    alert("Swap Successful!");
  };

  const fetchTokenData = async () => {
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();

      const tokenCurrencies = data.map(
        (tokenCurrency: { currency: string; price: number }) => ({
          ...tokenCurrency,
          price: tokenCurrency.price.toFixed(4),
          image: `${token_base_image_url}${tokenCurrency.currency}.svg`,
        })
      );

      setTokenCurrencies(tokenCurrencies);
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => {
        return (
          <Form>
            <Paper
              elevation={1}
              sx={{
                padding: 4,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Swap
              </Typography>

              <FormControl fullWidth margin="normal">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Field
                      as={TextField}
                      label="Amount"
                      name="fromAmount"
                      fullWidth
                      type="number"
                      variant="outlined"
                      error={touched.fromAmount && !!errors.fromAmount}
                      helperText={touched.fromAmount && errors.fromAmount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const fromAmount = parseFloat(e.target.value);

                        setFieldValue("fromAmount", fromAmount);

                        if (values.fromCurrency && values.toCurrency) {
                          const toAmount = calculateCurrency(
                            fromAmount,
                            values.fromCurrency,
                            values.toCurrency
                          );

                          setFieldValue("toAmount", toAmount);
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TokenCurrencySelect
                      value={values.fromCurrency}
                      disabledValue={values.toCurrency}
                      options={tokenCurrencies}
                      onChange={(value: string) => {
                        setFieldValue("fromCurrency", value);

                        if (values.fromAmount && values.toCurrency) {
                          const toAmount = calculateCurrency(
                            Number(values.fromAmount),
                            values.fromCurrency,
                            values.toCurrency
                          );

                          setFieldValue("toAmount", toAmount);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Field
                      as={TextField}
                      label="To"
                      name="toAmount"
                      fullWidth
                      type="number"
                      variant="outlined"
                      error={touched.toAmount && !!errors.toAmount}
                      helperText={touched.toAmount && errors.toAmount}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TokenCurrencySelect
                      value={values.toCurrency}
                      disabledValue={values.fromCurrency}
                      options={tokenCurrencies}
                      onChange={(value: string) => {
                        setFieldValue("toCurrency", value);

                        if (values.fromAmount && values.fromCurrency) {
                          const toAmount = calculateCurrency(
                            Number(values.fromAmount),
                            values.fromCurrency,
                            value
                          );

                          setFieldValue("toAmount", toAmount);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>

              {values.fromCurrency && values.toCurrency && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {`Price: 1 ${values.fromCurrency} = 
                            ${calculateCurrency(
                              1,
                              values.fromCurrency,
                              values.toCurrency
                            )} ${values.toCurrency}
                        `}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  color: "white",
                  borderRadius: "30px",
                }}
              >
                Create Swap →
              </Button>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SwapForm;
