const ethers = require('ethers');

const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
} = require("./AddressList")

const { erc20ABI, factoryABI, pairABI, routerABI } = require("./ABIinfo")

const provider = new ethers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
)

const factoryInstance = new ethers.Contract(
    factoryAddress,factoryABI,provider
)

//console.log(factoryInstance)

const routerInstance = new ethers.Contract(
    routerAddress,routerABI,provider
)

const FetchPrice = async(amount)=>{
    const token1 = new ethers.Contract(
        fromAddress,erc20ABI,provider
    )

    const token2 = new ethers.Contract(
        toAddress,erc20ABI,provider
    )

    const decimal1 = await token1.decimals()
    const decimal2 = await token2.decimals()

    const amountIn = ethers.parseUnits(amount,decimal1).toString();
    const amountsOut = await routerInstance.getAmountsOut(amountIn,[
        fromAddress,
        toAddress
    ])

    const output = ethers.formatUnits(
        amountsOut[1].toString(),
        decimal2
    )

    console.log(output)
}

amount = "10"
FetchPrice(amount)