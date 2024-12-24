using System.Reflection;
using System.Runtime.Serialization.Formatters;
using System.Text.RegularExpressions;

public class TsxFix
{
   private static void doDirectory(DirectoryInfo sourceDirectory, string outputPath, int depth)
   {
      var sourceTsxFiles = sourceDirectory.GetFiles("*.tsx");
      foreach (var file in sourceTsxFiles)
      {
         var source = file.Name.Replace(".tsx", ".js");
         var outputFilePath = Path.Combine(outputPath, source);

         var depthModifier = "./";
         if (depth > 0)
         {
            depthModifier = "";

            for (var i = 0; i < depth; i++)
            {
               depthModifier = "../" + depthModifier;
            }
         }

         var map = outputFilePath + ".map";

         var text = System.IO.File.ReadAllText(outputFilePath)
         .Replace(
            "\"react/jsx-runtime\";",
            $"\"{depthModifier}react/jsx-runtime.js\";"
         ).Replace("{ className:", "{ class:");

         System.IO.File.WriteAllText(outputFilePath, text);
      }

      foreach (var subfolder in sourceDirectory.GetDirectories())
      {
         var outputSubFolder = Path.Combine(outputPath, subfolder.Name);
         if (Directory.Exists(outputSubFolder))
         {
            doDirectory(subfolder, outputSubFolder, depth + 1);
         }
      }
   }

   public static void Run(String[] args)
   {
      if (args.Count() < 2)
      {
         Console.WriteLine(@"JsxFix <source directory> <outputDirectory> (relative directories start with ""./"" )");
      }

      if (args.Count() == 2)
      {

         if (args[0].StartsWith("."))
         {
            var current = System.IO.Directory.GetCurrentDirectory();
            args[0] = Path.Combine(current, args[0].Replace("./", ""));
         }

         if (args[1].StartsWith("."))
         {
            var current = System.IO.Directory.GetCurrentDirectory();
            args[1] = Path.Combine(current, args[1].Replace("./", ""));
         }
      }

      if (args.Count() == 2 && System.IO.Path.Exists(args[0]) && System.IO.Path.Exists(args[1]))
      {
         var sourceDirectory = new System.IO.DirectoryInfo(args[0]);
         var outputPath = args[1];
         doDirectory(sourceDirectory, outputPath, 0);
      }
   }
}
