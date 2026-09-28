import os

with open('apps/server/.env', 'a') as f:
    f.write('\n\n# Cloudflare R2\n')
    f.write('R2_ENDPOINT="https://d3bdc781bc361c5db39d126fa1c49f50.r2.cloudflarestorage.com"\n')
    f.write('R2_ACCESS_KEY_ID="c05ebbb14421e03c048d5e59e48936ea"\n')
    f.write('R2_SECRET_ACCESS_KEY="dd39f4ada66944ed22b43100931eac77ecb3e364510fe9ca42aa135563a2abb5"\n')
    f.write('R2_BUCKET_NAME="printpanda-uploads"\n')

print('Done writing env')
