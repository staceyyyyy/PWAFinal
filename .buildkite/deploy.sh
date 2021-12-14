# if there's no args at all, set default to staging
if [ -z "$1" ] ; then
        environ=iii-nonprod
else
        environ=$1
fi

if [ -z "$2" ] ; then
        echo 'pipeline are setuped incorrectly'
        exit 1
fi

dockerImageTag=$(buildkite-agent meta-data get "image-tag")
echo "apply docker tag version " + $dockerImageTag
git clone ssh://git@phabricator.sirclo.com:2222/diffusion/309/swift-express.git
cd swift-express
yq w -i helmfile.d/values/$environ/$2/values.yaml image.tag $dockerImageTag
git config --global user.email "buildkite-agent@sirclo.com"
git config --global user.name "buildkite-agent"
git add .
git commit -m "bump up image @bypass-review"
git push -u origin master
helmfile --file=helmfile.d/$environ.yaml --selector name=$2 apply