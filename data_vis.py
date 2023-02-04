
import streamlit as st
import plotly.express as px
import pandas as pd

global df

st.title("Data Visualization")

# Sidebar
st.sidebar.header("Visualization Settings")


# Load data
uploaded = st.sidebar.file_uploader(label="Upload CSV or Excel file", type=["csv", "xlsx"])
st.set_option('deprecation.showfileUploaderEncoding', False)

if uploaded is not None:
    print("Uploaded file type:", type(uploaded))
    try:
        df = pd.read_csv(uploaded)
    except Exception as e:
        print(e)
        df = pd.read_excel(uploaded)
try:
    st.write(df)
    num_cols = list(df.select_dtypes(include=['int64', 'float64']).columns)
except Exception as e:
    print(e)
    st.write("Please upload a file")

# Add a selectbox to the sidebar:
chart_selectbox = st.sidebar.selectbox(
    label="Select Chart Type",
    options=["Boxplot", "Histogram", "LinePlots", "Scatterplots", "Bar Chart", "Line Chart", "Scatter Plot", "Pie Chart"]
)

num_cols = df.select_dtypes(include=['int64', 'float64']).columns

if chart_selectbox == 'Scatterplots': # If a scatterplot is selected
    st.sidebar.subheader("Scatterplot Settings")
    try:
        x = st.sidebar.selectbox(label="Select X", options=df.columns)
        y = st.sidebar.selectbox(label="Select Y", options=df.columns)
        st.plotly_chart(px.scatter(df, x=x, y=y))
    except Exception as e:
        print(e)
        st.write("Please upload a file")

elif chart_selectbox == 'LinePlots': # If a lineplot is selected
    st.sidebar.subheader("Lineplot Settings")
    try:
        x = st.sidebar.selectbox(label="Select X", options=df.columns)
        y = st.sidebar.selectbox(label="Select Y", options=df.columns)
        st.plotly_chart(px.line(df, x=x, y=y))
    except Exception as e:
        print(e)
        st.write("Please upload a file")

elif chart_selectbox == 'Boxplot': # If a boxplot is selected
    st.sidebar.subheader("Boxplot Settings")
    try:
        x = st.sidebar.selectbox(label="Select X", options=df.columns)
        y = st.sidebar.selectbox(label="Select Y", options=df.columns)
        st.plotly_chart(px.box(df, x=x, y=y))
    except Exception as e:
        print(e)
        st.write("Please upload a file")

elsif chart_selectbox == 'Histogram': # If a histogram is selected
    st.sidebar.subheader("Histogram Settings")
    try:
        x = st.sidebar.selectbox(label="Select X", options=df.columns)
        y = st.sidebar.selectbox(label="Select Y", options=df.columns)
        st.plotly_chart(px.histogram(df, x=x, y=y))
    except Exception as e:
        print(e)
        st.write("Please upload a file")
        