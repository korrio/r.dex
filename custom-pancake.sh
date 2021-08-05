git clone https://github.com/suraneti/pancake-uikit && \
cd pancake-uikit && yarn && yarn build && \
rm -rf ../node_modules/@pancakeswap-libs/uikit/dist && \
mv dist/ ../node_modules/@pancakeswap-libs/uikit/ && \
cd .. && rm -rf pancake-uikit/