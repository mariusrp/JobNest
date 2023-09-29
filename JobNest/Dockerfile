FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["JobNest/JobNest.csproj", "JobNest/"]
RUN dotnet restore "JobNest/JobNest.csproj"
COPY . .
WORKDIR "/src/JobNest"
RUN dotnet build "JobNest.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JobNest.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JobNest.dll"]
